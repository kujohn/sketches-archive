#!/bin/bash

canvas-sketch "sketches/$(exa --sort newest sketches/ | tail -n 1)" --hot
