import { reactive } from "vue";
import axios from "axios";
interface IResult<T> {
    result: T | null,
    loading: boolean,
    loaded: boolean,
    error: string | null
}
function useURLLoader<T>(url: string) {
    const handleResult = reactive<IResult<T>>({
        result: null,
        loading: true,
        loaded: false,
        error: null
    });
    axios.get(url).then((rawData) => {
        handleResult.result = rawData.data;
        handleResult.loading = false;
        handleResult.loaded = true;
    }).catch(err => {
        handleResult.loading = false;
        handleResult.error = err;
    })
    return handleResult;
}
export default useURLLoader;