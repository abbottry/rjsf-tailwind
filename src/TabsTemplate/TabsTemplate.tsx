import React, { useState } from "react";
import classnames from "classnames";

export default function TabsTemplate(props:any) {
  const [activeTab, setActiveTab] = useState(props.properties[0].name);

  return (
    <>
      <div className="flex items-center justify-between bg-slate-100 p-1 rounded-md mb-6">
        {props.properties.map((p:any, id:any) => (
          <button 
            key={id} 
            type="button" 
            onClick={() => setActiveTab(p.name)}
            className={classnames("text-sm py-2 w-1/3 rounded-md capitalize", {
              "bg-white font-medium": activeTab === p.name,
            })}
          >
            {p.name}
          </button>
        ))}
      </div>

      {props.properties.map((p:any, id:any) => (
        <div 
          key={id} 
          title={p.name}
          className={classnames({
            "hidden": activeTab !== p.name,
          })}
        >
          {p.children.map((element: any, index: number) => (
            <div
              key={index}
              className="mb-5"
            >
              {element}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
