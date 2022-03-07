(ns gifted_rubin.core
  (:require [quil.core :as q :include-macros true]
            [gifted_rubin.dynamic :as d]
            [quil.middleware :as m]))

(q/defsketch gifted_rubin
  :size d/size
  :setup d/setup
  :update d/update-state
  :draw d/draw-state
  :features [:keep-on-top]
  :middleware [m/fun-mode])
