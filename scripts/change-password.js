const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');

if (require.main !== module) return;

const configPath = path.join(__dirname, '..', '_config.yml');
const newPassword = process.argv[2];
const newUsername = process.argv[3];

if (!newPassword) {
  console.log('用法: node scripts/change-password.js <新密码> [新用户名]');
  console.log('示例: node scripts/change-password.js mynewpassword');
  console.log('示例: node scripts/change-password.js mynewpassword newuser');
  process.exit(1);
}

const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
let config = fs.readFileSync(configPath, 'utf8');

config = config.replace(/password_hash:\s*.*/, `password_hash: ${hash}`);

if (newUsername) {
  config = config.replace(/username:\s*.*/, `username: ${newUsername}`);
}

fs.writeFileSync(configPath, config, 'utf8');

console.log('密码修改成功！');
console.log(`新密码哈希: ${hash}`);
if (newUsername) console.log(`新用户名: ${newUsername}`);
console.log('\n请重启 hexo server 以使新密码生效。');
