import React from "react";

const renderEditorJS = (data) => {
  return data.blocks.map((block, index) => {
    const blockId = block.id || `block-${index}`;

    switch (block.type) {
      case "paragraph":
        return (
          <p
            key={blockId}
            style={{
              fontSize: "14px",
              lineHeight: "1.75",
              color: "#6D6C80",
              textAlign: "right",
              marginBottom: "1rem",
            }}
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );

      case "header":
        const HeaderTag = `h${block.data.level}`;
        return (
          <HeaderTag
            key={blockId}
            style={{
              fontWeight: "bold",
              textAlign: "right",
              marginBottom: "1.25rem",
              color: "#1a1a1a",
              fontSize: block.data.level <= 2 ? "2rem" : "1.5rem",
            }}
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );

      case "list":
        if (block.data.style === "checklist") {
          return (
            <div key={blockId} style={{ margin: "1.5rem 0" }} dir="rtl">
              {block.data.items.map((item, i) => (
                <label
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    cursor: "pointer",
                    userSelect: "none",
                    color: "#6D6C80",
                    fontSize: "14px",
                  }}
                >
                  <button
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#ffc124",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0",
                      cursor: "pointer",
                      boxShadow: "2px 4px 0 0 rgba(56,41,0,1)",
                    }}
                  >
                    .
                  </button>

                  <span
                    style={{
                      textDecoration: item.checked ? "line-through" : "none",
                      opacity: item.checked ? 0.6 : 1,
                      transition: "all 0.3s",
                    }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </label>
              ))}
            </div>
          );
        } else {
          const ListTag = block.data.style === "ordered" ? "ol" : "ul";
          return (
            <ListTag
              key={blockId}
              style={{
                paddingRight: "1.5rem",
                color: "#6D6C80",
                textAlign: "right",
                marginBottom: "1rem",
                lineHeight: "1.75",
              }}
              dir="rtl"
            >
              {block.data.items.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ListTag>
          );
        }

      default:
        return null;
    }
  });
};

const Explanation = ({ describe }) => {
  if (
    !describe ||
    describe === "" ||
    describe === null ||
    describe === "null"
  ) {
    return (
      <div className="d-flex justify-content-center py-4">
        <div className="w-100 text-center">
          <p className="text-muted">توضیحات ثبت نشده است</p>
        </div>
      </div>
    );
  }

  let isEditorJS = false;
  let parsedData = null;

  if (typeof describe === "string" && describe.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(describe);
      if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
        isEditorJS = true;
        parsedData = parsed;
      }
    } catch (e) {
      isEditorJS = false;
    }
  } else if (
    typeof describe === "object" &&
    describe.blocks &&
    Array.isArray(describe.blocks)
  ) {
    isEditorJS = true;
    parsedData = describe;
  }

  return (
    <div className="d-flex justify-content-center py-4">
      <div className="w-100" style={{ maxWidth: "960px" }}>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "2rem",
            textAlign: "right",
          }}
        >
          شرح دوره
        </h2>

        <div style={{ textAlign: "right", lineHeight: "1.75" }} dir="rtl">
          {isEditorJS ? (
            renderEditorJS(parsedData)
          ) : (
            <div
              style={{ fontSize: "16px", color: "#6D6C80" }}
              dangerouslySetInnerHTML={{ __html: describe }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Explanation;
