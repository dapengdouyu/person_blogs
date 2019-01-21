require('shelljs/global');
var spawn = require('child_process').exec;

try {
    hexo.on('deployAfter', function() {//当deploy完成后执行备份
		run();
	});
	hexo.on('new',function(data){
		spawn('start "C:\Program Files\Microsoft VS Code\Code.exe"'+ data.path);
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
		if (exec('git push  origin master').code !== 0) {
			echo('Error: Git push failed');
			exit(1);

		}
		echo("==================Auto Backup Complete============================")
	}
}