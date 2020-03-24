interface PathParam {
  path: { [key: string]: string | number | undefined };
}

export type Opts = {
  params?: any;
  data?: any;
};

export type WithPathOpts = Opts & PathParam;
