import { useState, useEffect } from 'react';
import axios from 'axios';


const useAxiosFetch = (dataURL) => {

    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {

        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {

            setIsLoading(true);

            try {
                
                const res = await axios.get(url, {
                    cancelToken: source.token
                })
                if (isMounted) {
                    setData(res.data);
                    setFetchError(null);
                }
            }

            catch (err) {

                if (isMounted) {
                    setData([]);
                    setFetchError(err.message);
                }
            }

            finally {
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataURL);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;

    }, [dataURL]);

    console.log(data)
    return { data, fetchError, isLoading };

}

export default useAxiosFetch;