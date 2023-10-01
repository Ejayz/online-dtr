import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const supabaseUrl = process.env.ProjectURL || "";
const anon_url = process.env.AnonymousKey || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createClient(supabaseUrl, anon_url);
  const prisma = new PrismaClient();

  if (req.method !== "POST") {
    res.status(400).json({
      code: 400,
      message: "Only POST method is allowed.",
    });
  }
  const {
    email,
    password,
    username,
    student_name,
    school,
    address,
    company,
    company_address,
    supervisor_name,
  } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        student_name: student_name,
        user_name: username,
      },
    },
  });
  console.log(data);
  if (error) {
    res.status(400).json({ code: 400, message: error.message });
  } else if (data) {
    const user = await prisma.user_meta_data.create({
      data: {
        student_name: student_name,
        username: username,
        school: school,
        address: address,
        company: company,
        company_address: company_address,
        supervisor_name: supervisor_name,
        user_id: data.user?.id,
      },
    });
    if (user) {
      res.status(200).json({
        code: 200,
        message: "New account created successfully.Please login.",
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Something went wrong.Please try again.",
      });
    }
  } else {
    res.status(400).json({
      code: 400,
      message: "Something went wrong.Please try again.",
    });
  }
}
