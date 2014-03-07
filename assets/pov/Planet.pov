// A Planet

global_settings { ambient_light White }
background { color White }

camera
{
  sky <0,0,1>
  direction <-1,0,0>
  right <-4/3,0,0>
  location <11,0,0>
  look_at <0,0,0>
  angle 15
}

light_source
{
  <10,0,0>
  color White
}

sphere
{
  <0,0,0>,
  1
  texture
  {
    pigment
    {
      ripples scale 0.2 turbulence 1.5
      color_map
      {
        [0.0 color rgb<0.8, 0.1, 0.2> ]
        [0.1 color rgb<1.0, 0.3, 0.1> ]
        [0.5 color rgb<0.9, 0.3, 0.2> ]
        [0.6 color rgb<1.0, 0.2, 0.3> ]
        [1.0 color rgb<1.0, 0.0, 0.0> ]
      }
    }
    normal { wrinkles 0.75 scale 0.1}
    finish { diffuse 0.9 phong 0.1}
  }
}
