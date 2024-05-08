export const cathAsyncError = (z) =>{
    return (req,res,next) => {
        Promise.resolve(z(req,res,next)).catch(next)
    };
};