const adminUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const emailLoc = "admin@avancerpi.local";
      const passwordLoc = "Avancer@123";
  
      const errorMsg = 'Auth failed email or password is wrong';
  
      if (email !== emailLoc || password !== passwordLoc) {
        return res.status(401)
          .json({ message: errorMsg, success: false });
      }
  
      const jwtToken = jwt.sign(
        { email: emailLoc },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.status(200)
        .json({
          message: "Login Success",
          success: true,
          jwtToken,
          email,
        });
    } catch (err) {
      res.status(500)
        .json({
          message: "Internal server error",
          success: false
        });
    }
  };
  
  module.exports = {adminUser };