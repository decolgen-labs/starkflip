/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: { emotion: true },
    reactStrictMode: true,
    webpack(config) {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            'bufferutil': 'commonjs bufferutil',
        })
            ,
            config.module.rules.push(
                {
                    test: /\.svg$/i,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                        {
                            loader: "react-svg-loader",
                            options: {
                                jsx: false, // true outputs JSX tags
                                svgo: {
                                    plugins: [
                                        { removeViewBox: false },
                                    ],
                                },
                            }
                        },

                    ]
                }
            );
        return config;
    },
    env: {
        PUBLIC_NEXT_API: String(process.env.PUBLIC_NEXT_API) || 'http://localhost:5001',
        PUBLIC_NEXT_SOCKET_PORT: String(process.env.PUBLIC_NEXT_SOCKET_PORT) || 'http://localhost:5004',
        FLIP_CONTRACT_ADDRESS: String(process.env.NEXT_PUBLIC_CONTRACT),
        NEXT_PUBLIC_PRIVATE_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY,
        NEXT_PUBLIC_POOL_ID: process.env.NEXT_PUBLIC_POOL_ID,
        NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
        NEXT_PUBLIC_ACCOUT: process.env.NEXT_PUBLIC_ACCOUT,
        PUBLIC_API: process.env.PUBLIC_NEXT_API,
        PUBLIC_NEXT_SOCKET_PORT: process.env.PUBLIC_NEXT_SOCKET_PORT,


    }
};

export default nextConfig;
