# admin-fe 企业级后台管理系统线上自动打包部署shell脚本
# by Loding 2018年9月5日
#!/bin/sh

GIT_HOME=/data/home/www/developer/git-repository/
DEST_PATH=/data/home/www/product/front/

if [ ! -n "$1" ];
then
    echo -e "Please input a project name, You can input as follows:"
    echo -e "./fe-deploy.sh admin-fe"
    exit
fi

if [ $1 = "admin-fe" ];
then
    echo -e "---------Enter Project--------"
    cd $GIT_HOME$1
else
    echo -e "Invalid Project Name!"
    exit
fi

# clean dist
echo -e "-------Clean Dist--------"
rm -rf ./dist

echo -e "----------Git Pull-----------"
git pull

echo -e "----------Yarn Install-----------"
yarn

echo -e "----------Yarn Run Dist-----------"
yarn run dist

if [ -d "./dist"]
then
    echo -e "----------Clean Dest-----------"
    rm -rf $DEST_PATH/dist

    echo -e "----------Copy Dest-----------"
    cp -R ./dist $DEST_PATH$1/

    echo -e "----------Deploy Success-----------"
else
    echo -e "----------Deploy Fail-----------"
fi

