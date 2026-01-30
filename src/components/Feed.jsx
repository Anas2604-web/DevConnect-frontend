import axios from "axios";
import { URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
    const dispatch = useDispatch();
    
    const feed = useSelector((store => store.feed));

    const getFeed = async () => {
        if(feed) return;
        try {
         const res = await axios.get(URL + "/feed", 
          {withCredentials:true}
     )
        dispatch(addFeed(res.data));
     }
     catch(err) {
        //
     }
    }
    useEffect(() => {
        getFeed();
    }, [])

    return (
        <div>
           Feed
        </div>
    )
}

export default Feed;