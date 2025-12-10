import React, { useState } from "react";
import { Button } from "reactstrap";

export function CorrectTextAi() {
  const [text, setText] = useState();
  const [fixed, setfixed] = useState();

  const fixText = async () => {
    const respons = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer <OPENROUTER_API_KEY>",
          "HTTP-Referer": "<YOUR_SITE_URL>", 
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "admin",
              content: `edit this text ${text}`,
            },
          ],
        }),
      }
    );
    const data = await respons.json();
    console.log(data)
    setfixed(data.choices[0].message.content)
  };
  return(
    <Button onClick={fixText} color="Success">اصلاح به کمک هوش مصنوعی</Button>
  )
}
