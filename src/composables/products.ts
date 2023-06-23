import { serverAddress } from '@/helpers/constants'
import { useFetch } from '@vueuse/core'
import { Product } from '@/helpers/types'

export default function useProducts() {
    // @TODO: Prob some mapping
    return useFetch<Product[]>(serverAddress, {
        afterFetch(ctx) {
            console.log(ctx.data)
            ctx.data = ctx.data.products
            return ctx
          },
    }).get().json()
}