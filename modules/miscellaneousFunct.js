//Why does this JS file have a .f90 file extension? 
// Turns out you can just, like, give files any extension you want, and nobody can stop you. 
// And it makes me happy having a random ""Fortran"" file in this mostly JS shitpost.

export function splitStr3Ways(str, p1, p2) {
    return [str.slice(0, p1), str.slice(p1, p2), str.slice(p2, -1)]
}