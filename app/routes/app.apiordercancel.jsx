import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const action = async ({ request }) => {
  try {
    const body = await request.json();
    const orderId = body.orderId;
    const storeUrl = body.storeUrl
    const storeHostname = new URL(storeUrl).hostname; 
    if (!orderId) {
      return json(
        { success: false, message: "Missing orderId" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    let cancelType = await prisma.cancelOrderType.findFirst({
      where: { storeHostname },
    });

    if (!cancelType) {
      cancelType = await prisma.cancelOrderType.create({
        data: {
          shop,
          cancelOrderBehavior: "direct",
          script: null,
        },
      });
    }

    if (cancelType?.cancelOrderBehavior === "script") {
      return json(
        { success: false, redirection: true },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const latestSession = await prisma.session.findFirst({
      where: { shop : storeHostname },
    });

    if (!latestSession?.accessToken) {
      return json(
        { success: false, message: "Admin session or access token not found." },
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const response = await fetch(
      `https://${storeHostname}/admin/api/2023-10/orders/${orderId}/cancel.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": latestSession.accessToken,
        },
      }
    );

    if (response.ok) {
      return json(
        { success: true },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
    } else {
      const errorText = await response.text();
      return json(
        { success: false, message: "Failed to cancel the order." },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

  } catch (error) {
    return json(
      { success: false, message: "Internal Server Error" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
};

// export const action = async ({ request }) => {
//     try {
//         const body = await request.json();
//         console.log("body", body)
//         const id = body.orderId;

//         const type = await prisma.cancelOrderType.findFirst();
//         console.log("cancel type",type);
//         if(type.cancelOrderBehavior=="script"){
//             return json(
//                     { success: false, redirection: true },
//                     { headers: { "Access-Control-Allow-Origin": "*" } }
//             );
//         }

//         const session = await prisma.session.findFirst({
//             orderBy: { expires: "desc" },
//         });
//         if (!session || !session.accessToken) {
//             throw new Error("Admin access token not found.");
//         }
//         const shopDomain = session.shop;
//         const accessToken = session.accessToken;
//         try {
//             const response = await fetch(`https://${shopDomain}/admin/api/2023-10/orders/${id}/cancel.json`, {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-Shopify-Access-Token": `${accessToken}`,
//                 },
//             });

//             if (response.ok) {
//                 return json(
//                     { success: true },
//                     { headers: { "Access-Control-Allow-Origin": "*" } }
//                 );
//             } else {
//                 return json(
//                     { success: false },
//                     { headers: { "Access-Control-Allow-Origin": "*" } }
//                 );
//             }
//         } catch (err) {
//             console.log("api",err)
//             return json(
//                 { message: "Internal Server Error" },
//                 { headers: { "Access-Control-Allow-Origin": "*" } }
//             );
//         }
//     } catch (error) {
//         console.log(error)
//         return json(
//             { message: "Internal Server Error" },
//             { headers: { "Access-Control-Allow-Origin": "*" } }
//         );
//     }
// };