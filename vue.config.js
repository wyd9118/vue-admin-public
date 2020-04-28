"use strict"
const path = require('path');
module.exports = {
    publicPath:process.env.NODE_ENV==='production'?'/yd-build':'',
    outputDir:process.env.NODE_ENV==='production'?'yd-build':'',
    productionSourceMap:false,
    configureWebpack:()=>{
        return {
            resolve:{
                alias:{
                    '@':path.resolve(__dirname,'src')
                }
            }
        }
    },
    // configureWebpack:{
    //     resolve:{
    //         alias:{
    //             '@':path.resolve(__dirname,'src')
    //         }
    //     }
    // },
    chainWebpack:(config)=>{ console.log(config.resolve.alias)
        config.when(process.env.NODE_ENV==='development',config=>config.devtool('cheap-module-eval-source-map'))
    },
    devServer:{
        // port:8080,
        hot:true,
        open:true,
        proxy:{
            '/api':{
                target:process.env.VUE_APP_BASE_API,
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }    
            }
        }
    }
}