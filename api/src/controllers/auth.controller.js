const duo_api = require('@duosecurity/duo_api');

import config from "../config";
import axios from "axios";

const host = config.api_host;
const duo_client = new duo_api.Client(config.duo_ikey, config.duo_skey, config.duo_host);

export const makePreauth = async (req, res) => {
  const rfid_code = req.body.rfid_code;
  const auth_device = req.body.auth_device;

  try {
    const uri = `${host}/users/rfid/${rfid_code}`;
    const user = await axios.get(uri);

    if(!user){
        return res
            .status(404)
            .json({message: `No existe un usuario con el RFID ${rfid_code}`});
    }
    
    duo_client.jsonApiCall('POST', '/auth/v2/preauth', { username: user.data.username }, (duo_res) => {
      let final_res = {
        result: duo_res.response.result,
        username: user.data.username
      }
      return res.json(final_res);
    });
  } catch (error){
    res.status(500).json({
      result: "failed"
    });
  }

}


export const makeAuthPush = async (req, res) => {
  const username = req.body.username;

  try {

    const params = {
      username: username,
      factor: "push",
      device: "auto"
    }

    duo_client.jsonApiCall('POST', '/auth/v2/auth', params, (duo_res) => {
      const resp = {
        result: duo_res.response.result
      }
      return res.json(resp);
    });
  } catch (error){
    if (error.message == "Request failed with status code 404"){
      res.status(404).json({
        message: "Usuario no encontrado"
      })
    } else {
      res.status(500).json({
        message: "Error en el lado del servidor"
      })
    }
  }

}


export const makeAuthCode = async (req, res) => {
  const username = req.body.username;
  const passcode = req.body.passcode;

  try {

    const params = {
      username: username,
      factor: "passcode",
      passcode: passcode
    }
    
    duo_client.jsonApiCall('POST', '/auth/v2/auth', params, (duo_res) => {
      return res.json(duo_res.response.result);
    });
  } catch (error){
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo encontrar el usuario",
    });
  }

}

