#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e


push_addr=`git remote get-url --push origin`
commit_info=`git describe --all --always --long`
dist_path=docs/.vuepress/dist
push_branch=gh-pages

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd $dist_path

git init
git add -A
git commit -m "deploy, $commit_info"
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
git push -f $push_addr HEAD:$push_branch

cd -
rm -rf $dist_path
