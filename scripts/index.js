require('shelljs/global');
console.log("hexo213333333333333333333333333333333333333333333333333")

try {
    hexo.on('deployAfter', function() {//当deploy完成后执行备份
        console.log("1")
		run();
	});
} catch (e) {
	console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}

function run() {
	if (!which('git')) {
		echo('Sorry, this script requires git');
		exit(1);
	} else {
		echo("======================Auto Backup Begin===========================");
		cd('I:/blog');    //此处修改为Hexo根目录路径
		if (exec('git add .').code !== 0) {
			echo('Error: Git add failed');
			exit(1);

		}
		if (exec('git commit -am "Form auto backup script\'s commit"').code !== 0) {
			echo('Error: Git commit failed');
			exit(1);
        }
		if (exec('git tag -d v3.0').code !== 0){
			echo('Error: Git delete tag failed');
			exit(1);
		}
		if (exec('git tag -a v3.0 -m"Form auto backup script\'s tags"').code !== 0){
			echo('Error: Git add tag failed');
			exit(1);
		}
		if (exec('git push  origin --tags').code !== 0) {
			echo('Error: Git push failed');
			exit(1);

		}
		echo("==================Auto Backup Complete============================")
	}
}