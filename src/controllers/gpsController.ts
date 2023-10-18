import Gps from "@/models/gps";
import { Request, Response } from "express";

export async function getGps(
  req: Request<{ device_id: string }>,
  res: Response
) {
  try {
    const gps = await Gps.findAll({
      where: { device_id: req.params.device_id },
    });
    return res.json(gps);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function getDevices(req: Request, res: Response) {
  try {
    const gps = await Gps.findAll({attributes: [
      'device_id', 'device_type'
    ], group: ['device_id', 'device_type']});
    return res.json(gps);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
}
