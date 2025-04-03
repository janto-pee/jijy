// export const jwtConstants = {
//   //   secret: process.env.ACCESS_TOKEN_PRIVATE,
//   secret:
//     '5ece9db0816c3726a22f78b4a3a6238b8dc4df574821317bcbbff65b5385107046bf39f0f896759e9f389cec7f43cfd73c510617868a063212270763c36f3bdae3ee6d8f3b17353e7f8e3181dc75a8996e5a699182719fcd8b2fc80d24465390257aac838b4ebe0324ec2007b7e33babb6abdb65f24ce175ff7e0fbeb6189dc46bb9900db5f44e4134206d39abdbc494ded06db443434dc658da1fc16431c16f59e95bdbad18b4f1d900632289902bcc56b0550f9ea371736cc0c5b612fec7a6f296e426f7bc3a7cf6e9943cd97f418884ac44d8cf9a60919307855b02d923df688923e299e1c68db7a277ac6505b342e8fdbc1c4306eb78476c6474dd55a6fc',
// };

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'your-secret-key-should-be-in-env-file',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
