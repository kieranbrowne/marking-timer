// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('marking_timer.core');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('alandipert.storage_atom');
marking_timer.core.now = (function marking_timer$core$now(){
return (new Date()).getTime();
});
marking_timer.core.cob = (new Date((2016),(12),(1),(17),(0))).getTime();
marking_timer.core.next_occuring_time = (function marking_timer$core$next_occuring_time(timestring){
var vec__13823 = cljs.core.re_matches(/(\d+):(\d+)/,timestring);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13823,(0),null);
var hrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13823,(1),null);
var mins = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13823,(2),null);
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
marking_timer.core.state = alandipert.storage_atom.local_storage(reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$now,marking_timer.core.now(),cljs.core.cst$kw$finish,marking_timer.core.next_occuring_time("17:00"),cljs.core.cst$kw$total,(50),cljs.core.cst$kw$times,cljs.core.PersistentVector.EMPTY], null)));
marking_timer.core.times = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$times], null));
marking_timer.core.finish = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$finish], null));
marking_timer.core.nexttime = (function marking_timer$core$nexttime(timestring){
var vec__13829 = cljs.core.re_matches(/(\d+):(\d+)/,timestring);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13829,(0),null);
var hrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13829,(1),null);
var mins = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13829,(2),null);
return (marking_timer.core.now() + cljs.core.mod(((new Date((2016),(10),(17),hrs,mins)).getTime() - marking_timer.core.now()),((((1000) * (60)) * (60)) * (24))));
});
marking_timer.core.total = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$total], null));
marking_timer.core.differences = (function marking_timer$core$differences(){
return cljs.core.reverse(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)),cljs.core.rest((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)))));
});
marking_timer.core.intervals = (function marking_timer$core$intervals(){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13832_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._,cljs.core.reverse(p1__13832_SHARP_));
}),marking_timer.core.differences());
});
marking_timer.core.remaining_exams = (function marking_timer$core$remaining_exams(){
return ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.total) : cljs.core.deref.call(null,marking_timer.core.total)) - cljs.core.count(marking_timer.core.differences()));
});
marking_timer.core.time_remaining = (function marking_timer$core$time_remaining(){
return ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.finish) : cljs.core.deref.call(null,marking_timer.core.finish)) - (function (){var G__13834 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__13834) : cljs.core.deref.call(null,G__13834));
})());
});
marking_timer.core.time_remaining_per_exam = (function marking_timer$core$time_remaining_per_exam(){
return (marking_timer.core.time_remaining() / marking_timer.core.remaining_exams());
});
marking_timer.core.time_str = (function marking_timer$core$time_str(timeint){
return cljs.core.re_find(/\d+:\d+/,(new Date(timeint)).toTimeString());
});
marking_timer.core.text_to_time = (function marking_timer$core$text_to_time(t){
var vec__13838 = cljs.core.re_matches(/(\d+)h(\d+)m/,t);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13838,(0),null);
var hrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13838,(1),null);
var mins = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13838,(2),null);
return cljs.core.mod(((0) + marking_timer.core.time_remaining()),((((1000) * (60)) * (60)) * (24)));
});
marking_timer.core.beep = (new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="));
marking_timer.core.drop_nth = (function marking_timer$core$drop_nth(n,coll){
return cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (p1__13841_SHARP_,p2__13842_SHARP_){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(p1__13841_SHARP_,n)){
return p2__13842_SHARP_;
} else {
return null;
}
}),coll);
});
marking_timer.core.nice = (function marking_timer$core$nice(t){
var days = (function (){var G__13847 = ((((t / (1000)) / (60)) / (60)) / (24));
return Math.floor(G__13847);
})();
var hours = (function (){var G__13848 = ((((t - ((((days * (100)) * (60)) * (60)) * (24))) / (1000)) / (60)) / (60));
return Math.floor(G__13848);
})();
var mins = (function (){var G__13849 = (((t - (((hours * (1000)) * (60)) * (60))) / (1000)) / (60));
return Math.floor(G__13849);
})();
var secs = (function (){var G__13850 = ((t - ((mins * (1000)) * (60))) / (1000));
return Math.floor(G__13850);
})();
return [cljs.core.str(((!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),hours)))?[cljs.core.str(hours),cljs.core.str("h ")].join(''):null)),cljs.core.str(mins),cljs.core.str("m"),cljs.core.str(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),hours))?[cljs.core.str(secs),cljs.core.str("s")].join(''):null))].join('');
});
marking_timer.core.app = (function marking_timer$core$app(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,"Marking Timer"], null),new cljs.core.PersistentVector(null, 18, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Students to mark:"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"number",cljs.core.cst$kw$value,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.total) : cljs.core.deref.call(null,marking_timer.core.total)),cljs.core.cst$kw$on_DASH_change,(function (p1__13851_SHARP_){
var G__13867 = marking_timer.core.total;
var G__13868 = p1__13851_SHARP_.target.value;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__13867,G__13868) : cljs.core.reset_BANG_.call(null,G__13867,G__13868));
})], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Current time: ",marking_timer.core.time_str((function (){var G__13869 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__13869) : cljs.core.deref.call(null,G__13869));
})())], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"I need to finish by: ",marking_timer.core.time_str((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.finish) : cljs.core.deref.call(null,marking_timer.core.finish)))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"time",cljs.core.cst$kw$value,marking_timer.core.time_str((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.finish) : cljs.core.deref.call(null,marking_timer.core.finish))),cljs.core.cst$kw$on_DASH_change,(function (p1__13852_SHARP_){
var G__13870 = marking_timer.core.finish;
var G__13871 = marking_timer.core.next_occuring_time(p1__13852_SHARP_.target.value);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__13870,G__13871) : cljs.core.reset_BANG_.call(null,G__13870,G__13871));
})], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"I need to finish in ",marking_timer.core.nice(marking_timer.core.time_remaining()),"  "], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$value,"Start new timer",cljs.core.cst$kw$on_DASH_click,(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$times], null)),(function (x){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(x,marking_timer.core.now());
}));
})], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){
var G__13872_13881 = (function (){
var G__13874_13883 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
var G__13875_13884 = marking_timer.core.now();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__13874_13883,G__13875_13884) : cljs.core.reset_BANG_.call(null,G__13874_13883,G__13875_13884));

if(((((function (){var G__13877 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__13877) : cljs.core.deref.call(null,G__13877));
})() - cljs.core.last((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)))) > (marking_timer.core.time_remaining_per_exam() * 0.75))) && (!(cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)))))){
return marking_timer.core.beep.play();
} else {
return null;
}
});
var G__13873_13882 = (1000);
setTimeout(G__13872_13881,G__13873_13882);

if(!(cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$timer,marking_timer.core.nice(((function (){var G__13878 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$now], null));
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__13878) : cljs.core.deref.call(null,G__13878));
})() - cljs.core.last((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(marking_timer.core.times) : cljs.core.deref.call(null,marking_timer.core.times)))))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,[cljs.core.str("READY TO GO?")].join('')], null);
}
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tbody,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,"remaining "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,"average "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,"time left "], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,"time per exam "], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,marking_timer.core.remaining_exams()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,marking_timer.core.nice((cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,marking_timer.core.intervals()) / cljs.core.count(marking_timer.core.intervals())))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,marking_timer.core.nice(marking_timer.core.time_remaining())], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,marking_timer.core.nice(marking_timer.core.time_remaining_per_exam())], null)], null)], null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"History"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$value,"Clear history",cljs.core.cst$kw$on_DASH_click,(function (){
var G__13879 = reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$times], null));
var G__13880 = cljs.core.PersistentVector.EMPTY;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__13879,G__13880) : cljs.core.reset_BANG_.call(null,G__13879,G__13880));
})], null)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,x){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,marking_timer.core.nice(x),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.core.cursor(marking_timer.core.state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$times], null)),(function (times){
return marking_timer.core.drop_nth(((cljs.core.count(times) - i) - (2)),times);
}));
})], null)," \u00D7"], null)], null);
}),marking_timer.core.intervals()))], null)], null);
});
marking_timer.core.reload = (function marking_timer$core$reload(){
var G__13887 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [marking_timer.core.app], null);
var G__13888 = document.getElementById("app");
return (reagent.core.render_component.cljs$core$IFn$_invoke$arity$2 ? reagent.core.render_component.cljs$core$IFn$_invoke$arity$2(G__13887,G__13888) : reagent.core.render_component.call(null,G__13887,G__13888));
});
marking_timer.core.main = (function marking_timer$core$main(){
return marking_timer.core.reload();
});
goog.exportSymbol('marking_timer.core.main', marking_timer.core.main);
