import { login as authServiceLogin } from '../services/auth.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authServiceLogin(email, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
