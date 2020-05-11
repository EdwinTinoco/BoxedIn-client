import React from "react";

export default function ProductComment(props) {
   const {
      comments_id,
      Username,
      comments_comment,
      comments_date
   } = props.comment

   return (
      <div className="comments-wrapper">
         <div className="comment-info">
            <p>{`${Username},  ${comments_date}`}</p>
         </div>
         <div className="comments">
            <p>{comments_comment}</p>
         </div>
      </div>
   );
}