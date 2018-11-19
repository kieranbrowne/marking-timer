// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = typeof console !== 'undefined';
reagent.debug.tracking = false;
if(typeof reagent.debug.warnings !== 'undefined'){
} else {
reagent.debug.warnings = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
}
if(typeof reagent.debug.track_console !== 'undefined'){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__15133__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$warn], null),cljs.core.conj,cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__15133 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__15134__i = 0, G__15134__a = new Array(arguments.length -  0);
while (G__15134__i < G__15134__a.length) {G__15134__a[G__15134__i] = arguments[G__15134__i + 0]; ++G__15134__i;}
  args = new cljs.core.IndexedSeq(G__15134__a,0);
} 
return G__15133__delegate.call(this,args);};
G__15133.cljs$lang$maxFixedArity = 0;
G__15133.cljs$lang$applyTo = (function (arglist__15135){
var args = cljs.core.seq(arglist__15135);
return G__15133__delegate(args);
});
G__15133.cljs$core$IFn$_invoke$arity$variadic = G__15133__delegate;
return G__15133;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__15136__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$error], null),cljs.core.conj,cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__15136 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__15137__i = 0, G__15137__a = new Array(arguments.length -  0);
while (G__15137__i < G__15137__a.length) {G__15137__a[G__15137__i] = arguments[G__15137__i + 0]; ++G__15137__i;}
  args = new cljs.core.IndexedSeq(G__15137__a,0);
} 
return G__15136__delegate.call(this,args);};
G__15136.cljs$lang$maxFixedArity = 0;
G__15136.cljs$lang$applyTo = (function (arglist__15138){
var args = cljs.core.seq(arglist__15138);
return G__15136__delegate(args);
});
G__15136.cljs$core$IFn$_invoke$arity$variadic = G__15136__delegate;
return G__15136;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.debug.warnings,null) : cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null));

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(reagent.debug.warnings) : cljs.core.deref.call(null,reagent.debug.warnings));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reagent.debug.warnings,null) : cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null));

reagent.debug.tracking = false;

return warns;
});
