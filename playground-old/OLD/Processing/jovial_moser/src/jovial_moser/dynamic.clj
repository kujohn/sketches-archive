(ns jovial_moser.dynamic
  (:require [quil.core :as q]
            [toolbelt.core :as t]))

(defn setup []
  (q/frame-rate 60)
  (q/color-mode :hsb)
  {:count 1 :size 3 :power 10})

(defn update-state [state]
  {:count (+ (state :count) 1)
   :power (state :power)
   :size (state :size)})

(defn fan-out [number size dynamic]
  (q/with-stroke [nil]
    (q/with-fill [255 0 0]
      (q/with-translation [(/ (q/width) 2) (/ (q/height) 2)]
        (dotimes [i number]
          (q/ellipse (* (* (q/sin i) i) dynamic) (* (* (q/cos i) i) dynamic) size size))))))

(defn draw-state [state]
  (q/clear)
  (q/background 255)
  (dotimes [i 10]
    (fan-out (q/random (state :count)) (q/random (state :size)) (q/random (state :power)))))
