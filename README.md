# VeriPieo

VeriPieo is an information security challenge in the Web category, and was presented to participants of [KAF CTF 2019](https://ctf.kipodafterfree.com)

## Challenge story

This new *Next Generation Phone* concept is now running. Try to use it! - afaik, theres also a developers guide <3

## Challenge exploit

RCE over image description while it's stored in a temporary directory.

## Challenge solution

Get an image, inject it's description with php code, upload it, and before clicking ok execute your code.

## Building and installing

[Clone](https://github.com/NadavTasher/2019-VeriPieo/archive/master.zip) the repository, then type the following command to build the container:
```bash
docker build . -t veripieo
```

To run the challenge, execute the following command:
```bash
docker run --rm -d -p 1040:80 veripieo
```

## Usage

You may now access the challenge interface through your browser: `http://localhost:1040`

## Flag

Flag is:
```flagscript
KAF{w0w__th4t_t00k_s0me_d33p_d1991ng}
```

## License
[MIT License](https://choosealicense.com/licenses/mit/)