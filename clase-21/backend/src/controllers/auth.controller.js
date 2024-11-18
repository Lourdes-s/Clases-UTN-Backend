export const registerController = (req, res) => {
    const { name, password, email } = req.body
    // todo: validar name, password e email
    console.log(name, password,email)
    res.json({ok:true})
}