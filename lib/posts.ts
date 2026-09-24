import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import readingTime from 'reading-time';

export type Post = { slug:string; title:string; subtitle:string; date:string; tags:string[]; coverImg:string; thumbnailImg:string; content:string; html:string; readingTime:string; headings:{id:string; text:string; level:number}[] };
const dir=path.join(process.cwd(),'content/posts');
const md=new MarkdownIt({html:true,linkify:true,typographer:true});
function slugify(s:string){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
export function getPosts():Post[]{
 return fs.readdirSync(dir).filter(f=>f.endsWith('.md')).map(file=>{
  const raw=fs.readFileSync(path.join(dir,file),'utf8'); const {data,content}=matter(raw);
  const slug=file.replace(/^\d{4}-\d{2}-\d{2}-/,'').replace(/\.md$/,'');
  const headings:{id:string;text:string;level:number}[]=[];
  const html=md.render(content).replace(/<h([1-3])>(.*?)<\/h\1>/g,(_,level,text)=>{const plain=text.replace(/<[^>]+>/g,''); const id=slugify(plain); headings.push({id,text:plain,level:Number(level)}); return `<h${level} id="${id}">${text}</h${level}>`});
  const date=file.slice(0,10);
  return {slug,title:data.title||slug,subtitle:data.subtitle||'',date,tags:data.tags||[],coverImg:data['cover-img']||'',thumbnailImg:data['thumbnail-img']||data['cover-img']||'',content,html,readingTime:Math.ceil(readingTime(content).minutes)+' min read',headings};
 }).sort((a,b)=>b.date.localeCompare(a.date));
}
export function getPost(slug:string){return getPosts().find(p=>p.slug===slug)}
