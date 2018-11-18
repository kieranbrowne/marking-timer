(ns marking-timer.core
    (:require [reagent.core :as reagent :refer [atom cursor]]
              [alandipert.storage-atom :refer  [local-storage]]
              [cljsjs.svgjs]
              [goog.string :refer [format]]
              [goog.string.format]
              ))

(defn now [] (.getTime (js/Date.)))
(def cob (.getTime (js/Date. 2016 12 1 17 00)))

(defn next-occuring-time [timestring]
  (let [[_ hrs mins] (re-matches #"(\d+):(\d+)" timestring)
        t (js/Date.)]
    (.setHours t hrs)
    (.setMinutes t mins)
    (.setMilliseconds t 0)
    (if (< (.getTime t) (now))
      (+ (.getTime t) (* 1000 60 60 24))
      (.getTime t))
    ))

(def state (local-storage (atom
             {:now (now)
              :finish (next-occuring-time "17:00")
              :total 50
              :times []})
                          :timer))

(def times (cursor state [:times]))
(def finish (cursor state [:finish]))

(defn nexttime [timestring]
  (let [[_ hrs mins] (re-matches #"(\d+):(\d+)" timestring)]
    (+ (now)
      (mod
        (- (.getTime (js/Date. 2016 10 17 hrs mins)) (now))
        (* 1000 60 60 24))
       )))


(def total (cursor state [:total]))

(defn differences []
  (reverse (map vector @times (rest @times)))
  )

(defn intervals []
  (map #(apply - (reverse %)) (differences)))

(defn remaining-exams []
  (- @total (count (differences))))

(defn time-remaining []
  (- @finish (:now @state))
  )

(defn time-remaining-per-exam []
  (if (= 0 (remaining-exams))
    0.01
    (max
      (/ (time-remaining) (remaining-exams))
      0.01)
    )
  )

(defn current-task-time []
  (- @(cursor state [:now]) (last @times)))

(defn time-str [timeint]
  (re-find #"\d+:\d+" (.toTimeString (js/Date. timeint))))

(defn text-to-time [t]
  (let [[_ hrs mins] (re-matches #"(\d+)h(\d+)m" t)]
    (mod
      ; (+ 0 (.getTime (js/Date. 2016 1 1 hrs mins)))
      (+ 0 (time-remaining))
      (* 1000 60 60 24))
     ))

(def beep (js/Audio.
"data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
  ))

(defn drop-nth [n coll]
   (keep-indexed #(if  (not= %1 n) %2) coll))

(defn nice [t]
  (let [days (Math/floor (/ t 1000 60 60 24))
        hours (Math/floor (/ (- t (* days 100 60 60 24)) 1000 60 60))
        mins (Math/floor (/ (- t (* hours 1000 60 60)) 1000 60))
        secs (Math/floor (/ (- t (* mins 1000 60)) 1000))]
    (str (if (not (= 0 hours)) (str hours "h "))
         (if (not (= 0 mins)) (str mins "m"))
         (if (= 0 hours) (str secs "s")))))

;; -------------------------
;; Views

(defn polarToCartesian [cx cy r degrees]
  (let [radians (/ (* (.-PI js/Math) (- degrees 90)) 180)]
    {:x (+ cx (* r (.cos js/Math radians)))
     :y (+ cy (* r (.sin js/Math radians)))}))

(defn arc [x y r s e]
  (let [start (polarToCartesian x y r e)
        end (polarToCartesian x y r s)
        largeArcFlag (if (>= 180 (- e s)) 0 1)
        ]
    (if (< e 360)
      [:path {:d 
              (format
                "M%.2f,%.2f A%d,%d 0 %d,0 %.2f,%.2f"
                (:x start) (:y start) r r largeArcFlag (:x end) (:y end)) }]
      [:circle {:cx x :cy y :r r}]
      )))


(defn dial []
  [:svg {:viewBox "0 0 400 400" :version "1.1"
         :style {:cursor :pointer
                 :position "absolute"
                 :width (if (> (.-innerHeight js/window) (.-innerWidth js/window)) "80vw" "80vh")
                 :left "50%" :top "50%" :transform "translate(-50%, -50%)"}
         :on-click #(swap! times conj (now))}
   ; outlines
   [:g {:stroke "#318" :stroke-width "9" :fill "none"}
    [arc 200 200 140 0 360]
    [arc 200 200 150 0 360] ]
   ; 
   [:g {:stroke 
        (if (or (empty? @times) 
                (> 0.75 (/ (current-task-time) (time-remaining-per-exam)))) 
          "#cf0" 
          (if (> 500 (mod (:now @state) 1000)) "#f00" "#000")
          ) 
        :stroke-width "9" :fill "none"}
    [arc 200 200 150 0 (* (/ (current-task-time) (time-remaining-per-exam)) 360)]
    ]
   [:g {:alignment-baseline "middle" :text-anchor "middle" :font-size 14 :font-weight 500 :stroke "none" :fill "#cf0"}
     [:text {:x 200 :y 110} (nice (time-remaining-per-exam))]
     [:text {:x 200 :y 125} (str "per task")]
    ]
   [:g {:stroke "#3cf" :stroke-width "9" :fill "none"}
    [arc 200 200 140 0 (* (/ (- @finish (first @times) (time-remaining)) (- @finish (first @times))) 360)]
    ]
   [:g {:alignment-baseline "middle" :text-anchor "middle" :font-size 14 :font-weight 500 :stroke "none" :fill "#3cf"}
     [:text {:x 200 :y 284} (nice (time-remaining))]
     [:text {:x 200 :y 300} (str "remaining")]
    ]
   [:text {:x 200 :y 200 :alignment-baseline "middle" :text-anchor "middle" :font-size 36 :font-weight 900 :fill "#fff"}  
    (if (empty? @times) "Start Now"
      (nice (- (:now @state) (last @times))))]
   ]
  )

(def input-styles
  {:font-size "34px" :width "73px"
   :background "none"
   :color "white"
   :outline "none"
   :border "none"
   :border-bottom "3px solid white"}
  )

(defn app []
  [:div 
   {:style {:color "white"}}
   [:h2 {:style {:font-style "italic" 
                 :font-weight "200"
                 :color "white"
                 :position "absolute"
                 :top 0
                 :left "30px"
                 }} 
    "time" [:span {:style {:font-weight 900}} "spl.it"]]
   [:h2 {:style {:font-style "italic" 
                 :font-weight "900"
                 :color "white"
                 :position "absolute"
                 :bottom 0
                 :font-size "28px"
                 :right "30px"
                 }} 
               (if (< (count @times) 2)
                 "∞"
                 (nice  (/ (apply + (intervals)) (count (intervals)))))
    [:span {:style {:font-weight 200}} " avg."]]
   [:h2 {:style {:font-style "italic" 
                 :font-weight "900"
                 :color "white"
                 :position "absolute"
                 :bottom 0
                 :font-size "28px"
                 :left "30px"
                 }} 
    (remaining-exams) [:span {:style {:font-weight 200}} " to go"]]

   [dial]

   [:div
    {:style {:position "absolute"
             :top "30%"
             :font-size "34px"}}
    [:label "I need to finish "]
    [:input {:type "number" :value @total
             :on-change #(reset! total (.-target.value %))
             :style input-styles
             }] 
    [:label " tasks by " ]
    [:input {:type "time" :value (time-str @finish)
             :on-change #(reset! finish (next-occuring-time (.-target.value %)))
             :style (assoc input-styles :width "140px")
             }] [:br]
    [(fn []
      (js/setTimeout
        #(do (reset! (cursor state [:now]) (now))
             ; if current timer over 4 mins beep

             (if (and
                   (> (- @(cursor state [:now]) (last @times))
                    (* (time-remaining-per-exam) 0.75))
                   (not (empty? @times))
                   (> (mod @(cursor state [:now]) 1000) 900)
                   )
               (.play beep))
             ) 100)
      [:p 
       {:style {:font-size 0 :opacity 0}}
       (nice (time-remaining))]
      )]
    ]
    (into [:div
           {:style {:position "absolute"
                    :right 30 
                    :top 1}}
           [:h4 "History"]
           [:div
            {:style {:background "linear-gradient(to top, rgba(68,0,238,1), rgba(68,0,238,0) 100%);"}}]
           [:input  {:type  "button" :value  "Clear history"
              :on-click #(reset! times [])}]
           ] (map-indexed (fn [i x] [:p (nice x)
                           [:a {:on-click
                                #(swap! (cursor state [:times])
                                  (fn [times] (vec (drop-nth (- (count times) i 2) times))))
                                } "× "]])
                      (intervals)))
    ])


(defn reload  []
    (reagent/render-component
        [app]
          (.getElementById js/document  "app")))

(defn ^:export main  []
    (reload))

;; -------------------------
;; Routes


