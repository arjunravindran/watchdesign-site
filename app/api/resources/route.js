import { Client } from "@notionhq/client";

const DATABASE_ID = "1e6ff7c3-02ff-4d15-b304-d30bd458214e";

// Map module numbers to Notion Module field values
const MODULE_MAP = {
  "01": "1 · Anatomy & History",
  "02": "2 · Brand Strategy",
  "03": "3 · Mechanics",
  "04": "4 · Concept Sketching",
  "05": "5 · 2D Rendering",
  "06": "6 · 3D CAD",
  "07": "7 · Materials & Finishes",
  "08": "8 · Rendering & Visualisation",
  "09": "9 · Portfolio & Career",
  "10": "10 · Advanced Topics",
};

let notion;

function getNotionClient() {
  if (!notion) {
    if (!process.env.NOTION_API_KEY) {
      throw new Error("NOTION_API_KEY environment variable is not set");
    }
    notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
  }
  return notion;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const moduleNumber = searchParams.get("module");

    if (!moduleNumber || !MODULE_MAP[moduleNumber]) {
      return Response.json(
        { error: "Invalid module number" },
        { status: 400 }
      );
    }

    const moduleName = MODULE_MAP[moduleNumber];
    const client = getNotionClient();

    const response = await client.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "Module",
            select: {
              equals: moduleName,
            },
          },
          {
            property: "Priority",
            select: {
              is_not_empty: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: "Priority",
          direction: "ascending",
        },
      ],
    });

    const resources = response.results.map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Resource?.title?.[0]?.plain_text || "Untitled",
        type: props.Type?.select?.name || "Other",
        priority: props.Priority?.select?.name || "Recommended",
        platform: props.Platform?.select?.name || "",
        url: props["userDefined:URL"]?.url || "",
        notes: props.Notes?.rich_text?.[0]?.plain_text || "",
      };
    });

    return Response.json({ resources, moduleNumber });
  } catch (error) {
    console.error("Notion API error:", error);
    return Response.json(
      { error: "Failed to fetch resources", details: error.message },
      { status: 500 }
    );
  }
}
