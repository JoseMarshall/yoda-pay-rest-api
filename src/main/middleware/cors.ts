import cors from 'cors';

// import { logger } from '../../utils/logger';

// const whitelist = process.env.ALLOWED_URLS?.split(';'); // the array containing all url allowed by cors

const corsOptions = {
  origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // For now lets allow any URL
    // Comment the following line to restrict access by CORS
    callback(null, true);

    // //Uncomment the following lines if you want to restrict access by CORS
    // if (whitelist.indexOf(origin) !== -1 || !origin) {
    //   callback(null, true);
    // } else {
    //   logger.error(`${origin} Not allowed by CORS`);
    //   callback(new Error(`${origin} Not allowed by CORS`));
    // }
  },
  methods: ['PUT', 'PATCH', 'GET', 'POST', 'HEAD', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

export default cors(corsOptions);
