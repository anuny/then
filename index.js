module.exports = fute => {
	              
	const Path    = require('path');
                  
	const iif     = fute.require('iif');
	const swig    = fute.require('swig');
	const marked  = fute.require('marked');
	const less    = fute.require('less');
	const imports = fute.require('imports');
	const uglify  = fute.require('uglify');
	const comment = fute.require('comment');
	const rename  = fute.require('rename');
	const replace = fute.require('replace');
	const Server  = fute.require('server');
	const clean   = fute.require('clean');
	              
	const task    = fute.task;
	const dest    = task.dest;
	const config  = fute.config;
	const path    = config.path;

	
	// 实例化http与socket服务
	const server =  Server({
		port:config.port, 
		open:config.openBrowser, 
		reload:config.reloadBrowser 
	});
	
	
	// 文件注释模板
	var commentTpl = `/**
 * ${config.name} v${config.version}
 * Copyright 2017 ${config.author}
 * Released under the ${config.license} License
 * http://yangfei.name
 */\r\n`;


	// swig配置
	var swigOptions={
		defaults: {
			cache: false //禁止缓存
		},
		setup : swig => {
			marked.useTag(swig, 'markdown'); //解析markdown
		},
		data:config //数据
	};
	
	// 编译html到根目录
	task.add('html',()=>{
		return task.src(path.src.html)
			.pipe(swig(swigOptions))
			.pipe(rename({extname:'.html'}))
			.pipe(dest(path.dist.root))
			.pipe(server.reload())
	});
	
	
	// 合并js
	task.add('js',()=>{
		return task.src(path.src.js)
			.pipe(imports())
			.pipe(replace('__VERSION__', config.version))
			.pipe(comment(commentTpl))
			.pipe(rename({extname:'.js'}))
			.pipe(dest(path.dist.js))
			.pipe(server.reload())
	})
	
	

	// 使用uglify压缩js, 排除 ${minifix} 文件
	task.add('jsmin', ()=>{
		return task.src([`${path.dist.js}/**/*.js`,`!${path.dist.js}/**/*${config.minifix}.js`])
			.pipe(uglify())
			.pipe(comment(commentTpl))
			.pipe(rename({suffix:config.minifix}))
			.pipe(dest(path.dist.js));
	});
	

	// 清除编译
	task.add('clean',()=>{
		return task.src(path.dist.root).pipe(clean())
	})
	

	// 监听文件变化，执行对应任务
	task.add('watch',()=> {
		if(!config.watch)return;
		task.watch(path.src.all.html, ['html']);
		task.watch(path.src.all.js, ['js']);
	})
	
	
	// 初始化http与socket服务
	task.add('server',()=>{
		task.src(path.dist.root).pipe(server.start())
	})
	
	// 合并编译任务
	task.add('build',['html','js']);
	
	//合并编译, 服务, 监听。 监听与服务在打包完成后执行
	task.add('default',['build'],function(){
		task.run('server');
		task.run('watch');
	});
};

