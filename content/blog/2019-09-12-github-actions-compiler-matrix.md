+++
title = "Using multiple compilers in Github Actions matrix"
date = 2019-09-12

nav_name = "blog"
+++

With the upcomming release of Github Actions I expect a lot of people to start using this CI,
but as of writing this, the docs are quite spare.
When setting up the ARticated workflow to compile on both GCC and CLANG, I couldnt find the docs.

In the end i nested yaml mapping in a sequence using dashes instead of brackets!! kbye
