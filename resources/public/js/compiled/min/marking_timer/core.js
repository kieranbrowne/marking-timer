// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('marking_timer.core');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('alandipert.storage_atom');
goog.require('goog.string');
goog.require('goog.string.format');
marking_timer.core.now = (function marking_timer$core$now(){
return (new Date()).getTime();
});
marking_timer.core.cob = (new Date((2016),(12),(1),(17),(0))).getTime();
marking_timer.core.next_occuring_time = (function marking_timer$core$next_occuring_time(timestring){
var vec__16638 = cljs.core.re_matches(/(\d+):(\d+)/,timestring);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16638,(0),null);
var hrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16638,(1),null);
var mins = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16638,(2),null);
var t = (new Date());
t.setHours(hrs);

t.setMinutes(mins);

t.setMilliseconds((0));

if((t.getTime() < marking_timer.core.now())){
return (t.getTime() + ((((1000) * (60)) * (60)) * (24)));
} else {
return t.getTime();
}
});
marking_timer.core.state = alandipert.storage_atom.local_storage(reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$now,marking_timer.core.now(),cljs.core.cst$kw$finish,marking_timer.core.next_occuring_time("17:00"),cljs.core.cst$kw$total,(50),cljs.core.cst$kw$edit,true,cljs.core.cst$kw$times,cljs.core.PersistentVector.EMPTY], null)),cljs.core.cst$kw$timer);
marking_timer.core.times = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$times], null));
marking_timer.core.finish = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$finish], null));
marking_timer.core.nexttime = (function marking_timer$core$nexttime(timestring){
var vec__16644 = cljs.core.re_matches(/(\d+):(\d+)/,timestring);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16644,(0),null);
var hrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16644,(1),null);
var mins = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16644,(2),null);
return (marking_timer.core.now() + cljs.core.mod(((new Date((2016),(10),(17),hrs,mins)).getTime() - marking_timer.core.now()),((((1000) * (60)) * (60)) * (24))));
});
marking_timer.core.total = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$total], null));
marking_timer.core.differences = (function marking_timer$core$differences(){
return cljs.core.reverse(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)),cljs.core.rest((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)))));
});
marking_timer.core.intervals = (function marking_timer$core$intervals(){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__16647_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._,cljs.core.reverse(p1__16647_SHARP_));
}),marking_timer.core.differences());
});
marking_timer.core.remaining_exams = (function marking_timer$core$remaining_exams(){
return ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.total) : cljs.core.deref.call(null,marking_timer.core.total)) - cljs.core.count(marking_timer.core.differences()));
});
marking_timer.core.time_remaining = (function marking_timer$core$time_remaining(){
return ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.finish) : cljs.core.deref.call(null,marking_timer.core.finish)) - cljs.core.cst$kw$now.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))));
});
marking_timer.core.time_remaining_per_exam = (function marking_timer$core$time_remaining_per_exam(){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),marking_timer.core.remaining_exams())){
return 0.01;
} else {
var x__9555__auto__ = (marking_timer.core.time_remaining() / marking_timer.core.remaining_exams());
var y__9556__auto__ = 0.01;
return ((x__9555__auto__ > y__9556__auto__) ? x__9555__auto__ : y__9556__auto__);
}
});
marking_timer.core.current_task_time = (function marking_timer$core$current_task_time(){
return ((function (){var G__16649 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__16649) : cljs.core.deref.call(null,G__16649));
})() - cljs.core.last((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times))));
});
marking_timer.core.time_str = (function marking_timer$core$time_str(timeint){
return cljs.core.re_find(/\d+:\d+/,(new Date(timeint)).toTimeString());
});
marking_timer.core.text_to_time = (function marking_timer$core$text_to_time(t){
var vec__16653 = cljs.core.re_matches(/(\d+)h(\d+)m/,t);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16653,(0),null);
var hrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16653,(1),null);
var mins = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16653,(2),null);
return cljs.core.mod(((0) + marking_timer.core.time_remaining()),((((1000) * (60)) * (60)) * (24)));
});
marking_timer.core.beep = (new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="));
marking_timer.core.drop_nth = (function marking_timer$core$drop_nth(n,coll){
return cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (p1__16656_SHARP_,p2__16657_SHARP_){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(p1__16656_SHARP_,n)){
return p2__16657_SHARP_;
} else {
return null;
}
}),coll);
});
marking_timer.core.nice = (function marking_timer$core$nice(t){
var days = (function (){var G__16662 = ((((t / (1000)) / (60)) / (60)) / (24));
return Math.floor(G__16662);
})();
var hours = (function (){var G__16663 = ((((t - ((((days * (100)) * (60)) * (60)) * (24))) / (1000)) / (60)) / (60));
return Math.floor(G__16663);
})();
var mins = (function (){var G__16664 = (((t - (((hours * (1000)) * (60)) * (60))) / (1000)) / (60));
return Math.floor(G__16664);
})();
var secs = (function (){var G__16665 = ((t - ((mins * (1000)) * (60))) / (1000));
return Math.floor(G__16665);
})();
return [cljs.core.str(((!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),hours)))?[cljs.core.str(hours),cljs.core.str("h ")].join(''):null)),cljs.core.str(((!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),mins)))?[cljs.core.str(mins),cljs.core.str("m")].join(''):null)),cljs.core.str(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),hours))?[cljs.core.str(secs),cljs.core.str("s")].join(''):null))].join('');
});
marking_timer.core.polarToCartesian = (function marking_timer$core$polarToCartesian(cx,cy,r,degrees){
var radians = ((Math.PI * (degrees - (90))) / (180));
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,(cx + (r * Math.cos(radians))),cljs.core.cst$kw$y,(cy + (r * Math.sin(radians)))], null);
});
marking_timer.core.arc = (function marking_timer$core$arc(x,y,r,s,e){
var start = marking_timer.core.polarToCartesian(x,y,r,e);
var end = marking_timer.core.polarToCartesian(x,y,r,s);
var largeArcFlag = ((((180) >= (e - s)))?(0):(1));
if((e < (360))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$path,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$d,(function (){var G__16674 = "M%.2f,%.2f A%d,%d 0 %d,0 %.2f,%.2f";
var G__16675 = cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(start);
var G__16676 = cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(start);
var G__16677 = r;
var G__16678 = r;
var G__16679 = largeArcFlag;
var G__16680 = cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(end);
var G__16681 = cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(end);
return goog.string.format(G__16674,G__16675,G__16676,G__16677,G__16678,G__16679,G__16680,G__16681);
})()], null)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$circle,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$cx,x,cljs.core.cst$kw$cy,y,cljs.core.cst$kw$r,r], null)], null);
}
});
marking_timer.core.dial = (function marking_timer$core$dial(){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$svg,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$viewBox,"0 0 400 400",cljs.core.cst$kw$version,"1.1",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$cursor,cljs.core.cst$kw$pointer,cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$width,(((window.innerHeight > window.innerWidth))?"80vw":"60vh"),cljs.core.cst$kw$left,"50%",cljs.core.cst$kw$top,"50%",cljs.core.cst$kw$transform,"translate(-50%, -50%)"], null),cljs.core.cst$kw$on_DASH_click,(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?null:(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(marking_timer.core.times,cljs.core.conj,marking_timer.core.now());
}))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,"#318",cljs.core.cst$kw$stroke_DASH_width,"13",cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$style,(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(0.9)",cljs.core.cst$kw$opacity,(0)], null):new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(1)",cljs.core.cst$kw$opacity,(1)], null))], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [marking_timer.core.arc,(200),(200),(175),(0),(360)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [marking_timer.core.arc,(200),(200),(190),(0),(360)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,(((cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)))) || ((0.75 > (marking_timer.core.current_task_time() / marking_timer.core.time_remaining_per_exam()))))?"#cf0":((((500) > cljs.core.mod(cljs.core.cst$kw$now.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))),(1000))))?"#f00":"#000")),cljs.core.cst$kw$stroke_DASH_width,"13",cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$style,(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(0.8)",cljs.core.cst$kw$opacity,(0)], null):new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(1)",cljs.core.cst$kw$opacity,(1)], null))], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [marking_timer.core.arc,(200),(200),(190),(0),((marking_timer.core.current_task_time() / marking_timer.core.time_remaining_per_exam()) * (360))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$alignment_DASH_baseline,"middle",cljs.core.cst$kw$text_DASH_anchor,"middle",cljs.core.cst$kw$font_DASH_size,(14),cljs.core.cst$kw$font_DASH_weight,(500),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"#cf0",cljs.core.cst$kw$style,(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(0.45)",cljs.core.cst$kw$opacity,(0)], null):new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(1)",cljs.core.cst$kw$opacity,(1)], null))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,(200),cljs.core.cst$kw$y,(110)], null),marking_timer.core.nice(marking_timer.core.time_remaining_per_exam())], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,(200),cljs.core.cst$kw$y,(125)], null),[cljs.core.str("per task")].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,"#3cf",cljs.core.cst$kw$stroke_DASH_width,"13",cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$style,(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(0.75)",cljs.core.cst$kw$opacity,(0)], null):new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(1)",cljs.core.cst$kw$opacity,(1)], null))], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [marking_timer.core.arc,(200),(200),(175),(0),(((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.finish) : cljs.core.deref.call(null,marking_timer.core.finish)) - cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)))) - marking_timer.core.time_remaining()) / ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.finish) : cljs.core.deref.call(null,marking_timer.core.finish)) - cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times))))) * (360))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$alignment_DASH_baseline,"middle",cljs.core.cst$kw$text_DASH_anchor,"middle",cljs.core.cst$kw$font_DASH_size,(14),cljs.core.cst$kw$font_DASH_weight,(500),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"#3cf",cljs.core.cst$kw$style,(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(0.45)",cljs.core.cst$kw$opacity,(0)], null):new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(1)",cljs.core.cst$kw$opacity,(1)], null))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,(200),cljs.core.cst$kw$y,(284)], null),marking_timer.core.nice(marking_timer.core.time_remaining())], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,(200),cljs.core.cst$kw$y,(300)], null),[cljs.core.str("remaining")].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$x,(200),cljs.core.cst$kw$y,(210),cljs.core.cst$kw$alignment_DASH_baseline,"middle",cljs.core.cst$kw$text_DASH_anchor,"middle",cljs.core.cst$kw$font_DASH_size,(50),cljs.core.cst$kw$font_DASH_weight,(900),cljs.core.cst$kw$fill,"#fff",cljs.core.cst$kw$style,(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(0.65) translate(0,-0px)",cljs.core.cst$kw$opacity,(0)], null):new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$transform,"scale(1)",cljs.core.cst$kw$opacity,(1)], null))], null),((cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times))))?"Start Now":marking_timer.core.nice((cljs.core.cst$kw$now.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))) - cljs.core.last((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times))))))], null)], null);
});
marking_timer.core.input_styles = new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$font_DASH_size,"34px",cljs.core.cst$kw$width,"73px",cljs.core.cst$kw$background,"none",cljs.core.cst$kw$color,"white",cljs.core.cst$kw$outline,"none",cljs.core.cst$kw$border,"none",cljs.core.cst$kw$border_DASH_bottom,"3px solid white"], null);
marking_timer.core.app = (function marking_timer$core$app(){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"white"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h1,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$on_DASH_click,(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(marking_timer.core.state,cljs.core.update,cljs.core.cst$kw$edit,cljs.core.not);
}),cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$font_DASH_style,"italic",cljs.core.cst$kw$font_DASH_weight,"200",cljs.core.cst$kw$color,"white",cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,(0),cljs.core.cst$kw$left,"30px",cljs.core.cst$kw$font_DASH_size,"30px"], null)], null),"time",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,(900)], null)], null),"split"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$font_DASH_weight,"900",cljs.core.cst$kw$color,"white",cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$bottom,(0),cljs.core.cst$kw$font_DASH_size,"28px",cljs.core.cst$kw$right,"30px"], null)], null),(((cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times))) < (2)))?"\u221E":marking_timer.core.nice((cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,marking_timer.core.intervals()) / cljs.core.count(marking_timer.core.intervals())))),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,(200)], null)], null)," avg."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$font_DASH_weight,"900",cljs.core.cst$kw$color,"white",cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$bottom,(0),cljs.core.cst$kw$font_DASH_size,"28px",cljs.core.cst$kw$left,"30px"], null)], null),marking_timer.core.remaining_exams(),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,(200)], null)], null)," to go"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [marking_timer.core.dial], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div_SHARP_task_DASH_description,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$transform,cljs.core.cst$kw$font_DASH_size,cljs.core.cst$kw$transition,cljs.core.cst$kw$top,cljs.core.cst$kw$width,cljs.core.cst$kw$opacity,cljs.core.cst$kw$position,cljs.core.cst$kw$pointer_DASH_events,cljs.core.cst$kw$left],[(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?"translate(-50%,-50%)":"translate(-50%,-90%)"),"34px","all .6s ease","50%",(350),(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?(1):(0)),"absolute",(cljs.core.truth_(cljs.core.cst$kw$edit.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.state) : cljs.core.deref.call(null,marking_timer.core.state))))?"auto":"none"),"50%"])], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"I need to finish "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$type,"number",cljs.core.cst$kw$value,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.total) : cljs.core.deref.call(null,marking_timer.core.total)),cljs.core.cst$kw$on_DASH_change,(function (p1__16682_SHARP_){
var G__16698 = marking_timer.core.total;
var G__16699 = p1__16682_SHARP_.target.value;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__16698,G__16699) : cljs.core.reset_BANG_.call(null,G__16698,G__16699));
}),cljs.core.cst$kw$style,marking_timer.core.input_styles], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label," tasks by "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$type,"time",cljs.core.cst$kw$value,marking_timer.core.time_str((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.finish) : cljs.core.deref.call(null,marking_timer.core.finish))),cljs.core.cst$kw$on_DASH_change,(function (p1__16683_SHARP_){
var G__16700 = marking_timer.core.finish;
var G__16701 = marking_timer.core.next_occuring_time(p1__16683_SHARP_.target.value);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__16700,G__16701) : cljs.core.reset_BANG_.call(null,G__16700,G__16701));
}),cljs.core.cst$kw$style,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(marking_timer.core.input_styles,cljs.core.cst$kw$width,"140px")], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
var G__16702_16712 = (function (){
var G__16704_16714 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
var G__16705_16715 = marking_timer.core.now();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__16704_16714,G__16705_16715) : cljs.core.reset_BANG_.call(null,G__16704_16714,G__16705_16715));

if(((((function (){var G__16708 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__16708) : cljs.core.deref.call(null,G__16708));
})() - cljs.core.last((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)))) > (marking_timer.core.time_remaining_per_exam() * 0.75))) && (!(cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times))))) && ((cljs.core.mod((function (){var G__16709 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__16709) : cljs.core.deref.call(null,G__16709));
})(),(1000)) > (900)))){
return marking_timer.core.beep.play();
} else {
return null;
}
});
var G__16703_16713 = (100);
setTimeout(G__16702_16712,G__16703_16713);

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$font_DASH_size,(0),cljs.core.cst$kw$opacity,(0)], null)], null),marking_timer.core.nice(marking_timer.core.time_remaining())], null);
})], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div_SHARP_history,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$right,(30),cljs.core.cst$kw$top,(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"History"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$background,"linear-gradient(to top, rgba(68,0,238,1), rgba(68,0,238,0) 30%)",cljs.core.cst$kw$z_DASH_index,(1),cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$pointer_DASH_events,"none",cljs.core.cst$kw$top,(0),cljs.core.cst$kw$bottom,"20px",cljs.core.cst$kw$left,"-12px",cljs.core.cst$kw$right,(0)], null)], null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$height,"inherit",cljs.core.cst$kw$overflow_DASH_y,"scroll",cljs.core.cst$kw$max_DASH_height,"30vh"], null)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,x){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,"block"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_size,(28),cljs.core.cst$kw$text_DASH_decoration,cljs.core.cst$kw$none,cljs.core.cst$kw$cursor,"pointer"], null),cljs.core.cst$kw$on_DASH_click,(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$times], null)),(function (times){
return cljs.core.vec(marking_timer.core.drop_nth(((cljs.core.count(times) - i) - (2)),times));
}));
})], null),"\u00D7 "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,marking_timer.core.nice(x)], null)], null);
}),marking_timer.core.intervals())),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (){
var G__16710 = marking_timer.core.times;
var G__16711 = cljs.core.PersistentVector.EMPTY;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__16710,G__16711) : cljs.core.reset_BANG_.call(null,G__16710,G__16711));
})], null),"clear all"], null)], null)], null);
});
marking_timer.core.reload = (function marking_timer$core$reload(){
var G__16718 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [marking_timer.core.app], null);
var G__16719 = document.getElementById("app");
return (reagent.core.render_component.cljs$core$IFn$_invoke$arity$2 ? reagent.core.render_component.cljs$core$IFn$_invoke$arity$2(G__16718,G__16719) : reagent.core.render_component.call(null,G__16718,G__16719));
});
marking_timer.core.main = (function marking_timer$core$main(){
return marking_timer.core.reload();
});
goog.exportSymbol('marking_timer.core.main', marking_timer.core.main);
