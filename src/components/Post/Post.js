import React, { useState, useEffect } from "react";
import { ReactDOM } from "react-dom";

function Post(props) {
 const {title,text} = props;

 return(
    <div>
        {title}
        {text}
    </div>
 )

}

export default Post;
