(ns boring_elbakyan.dynamic
  (:require [quil.core :as q :include-macros true]))

(def PHI 1.618)

(defn setup []
  (q/no-stroke)
  (q/background 0)
  (q/frame-rate 10))

(def palette
  (cycle [[255 30 50] [100 255 50] [20 100 200] [255 255 255]]))

(defn draw-state []
  (q/clear)
  (q/with-translation [(/ (q/width) 2) (/ (q/height) 2)]
    (doseq [i (range 1000)]
      (let [v (+ (mod (q/frame-count) 3) i)
            ang (* v PHI (/ q/TWO-PI 1))
            r (* (Math/sqrt v) (q/width) (/ 43))
            x (* (q/cos ang) r)
            y (* (q/sin ang) r)]
      (q/fill (nth palette i))
      (q/ellipse x y (* v 0.02) (* v 0.02))))))


