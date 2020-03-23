interface PathParam {
  path: { [key: string]: string };
}

export type Opts = {
  params?: { [key: string]: string };
  data?: { [key: string]: string };
};

export type WithPathOpts = Opts & PathParam;
