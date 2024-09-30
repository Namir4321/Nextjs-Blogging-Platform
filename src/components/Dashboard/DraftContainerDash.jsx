import { fetchBlogFilterAction, fetchDraftAction } from "@/utils/action";
import React from "react";
import DraftCard from "@/components/Card/DraftCard";

const DraftContainerDash = async () => {
  const draft = await fetchBlogFilterAction(true);
 if (draft.length === 0) {
   return <div className="container bg-gray-100 dark:bg-muted">No Draft yet</div>;
 }
 return (
   <div className="container">
     {draft.map((item,i) => (
       <DraftCard Blog={item} index={i} key={item.id} />
     ))}
   </div>
 );
};

export default DraftContainerDash;
