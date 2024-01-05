export const dynamic = "force-dynamic";

import { apiOrigin } from "@/configs/urls";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const response = await axios.post(apiOrigin + "/api/chat", body);
  // /api/chat
  // body로는 {id: 2, message: "dafas"}

  console.log(response);

  // 나중에 response.data.content로 바꾸기
  return Response.json(response.data.content);
}
