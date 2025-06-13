import crypto from 'crypto';
export const generateFingerprint=(ip, userAgent)=>{
const hash = crypto.createHash('sha256');
hash.update(ip + userAgent);
return hash.digest('hex');
}
