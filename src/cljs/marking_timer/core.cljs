(ns marking-timer.core
    (:require [reagent.core :as reagent :refer [atom cursor]]
              [alandipert.storage-atom :refer  [local-storage]]
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
              :times []
              }
             )))

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
  (- @finish @(cursor state [:now]))
  )

(defn time-remaining-per-exam []
  (/ (time-remaining) (remaining-exams))
  )

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
         mins "m"
         (if (= 0 hours) (str secs "s")))))

;; -------------------------
;; Views


(defn app []
  [:div [:h2 "Marking Timer"]
   [:div
    [:label "Students to mark:"] [:br]
    [:input {:type "number" :value @total
             :on-change #(reset! total (.-target.value %))
             }] [:br]
    [:label "Current time: " (time-str @(cursor state [:now]))] [:br]
    [:label "I need to finish by: " (time-str @finish)] [:br]
    [:input {:type "time" :value (time-str @finish)
             :on-change #(reset! finish (next-occuring-time (.-target.value %)))
             }] [:br]
    [:label "I need to finish in "
            (nice (time-remaining)) "  "
     ;; (nice (text-to-time (nice (time-remaining))))
     ] [:br]
    ;; [:input {:type "text" :value (nice (time-remaining))
    ;;          :on-change #(reset! finish (text-to-time (.-target.value %)))
    ;;          }] [:br]
    [:input  {:type  "button" :value  "Start new timer"
              :on-click #(swap! (cursor state [:times])
                                (fn [x] (conj x (now))))}] [:br]
    [(fn []
      (js/setTimeout
        #(do (reset! (cursor state [:now]) (now))
             ; if current timer over 4 mins beep

             (if (and
                   (> (- @(cursor state [:now]) (last @times))
                    (* (time-remaining-per-exam) 0.75))
                   (not (empty? @times))
                   )
               (.play beep))
             ) 1000)
      (if (not (empty? @times))
          [:div.timer
               (nice (- @(cursor state [:now]) (last @times)))]
          [:p (str "READY TO GO?")])
      )]
    [:table [:tbody
             [:tr
              [:td "remaining "]
              [:td "average "]
              [:td "time left "]
              [:td "time per exam "]
              ]
             [:tr
              [:td (remaining-exams)]
              [:td (nice  (/ (apply + (intervals)) (count (intervals))))]
              [:td (nice (time-remaining))]
              [:td (nice (time-remaining-per-exam) )]
              ]]]
    (into [:div
           [:h4 "History"]
           [:input  {:type  "button" :value  "Clear history"
              :on-click #(reset! (cursor state [:times]) [])}]
           ] (map-indexed (fn [i x] [:p (nice x)
                           [:a {:on-click
                                #(swap! (cursor state [:times])
                                  (fn [times] (drop-nth (- (count times) i 2) times)))
                                } " ×"]])
                      (intervals)))
    ]])


(defn reload  []
    (reagent/render-component
        [app]
          (.getElementById js/document  "app")))

(defn ^:export main  []
    (reload))

;; -------------------------
;; Routes


