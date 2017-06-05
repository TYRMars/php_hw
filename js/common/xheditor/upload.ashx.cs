using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO;
using System.Web.SessionState;
using System.Drawing;
using System.Drawing.Imaging;

namespace AMS.Web.xheditor
{
    /// <summary>
    /// upload 的摘要说明
    /// </summary>
    public class upload : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string m = context.Request["m"];
            if(m=="up_contentImg")
            {
                #region MyRegion
                string nid = context.Request["nid"];
                HttpPostedFile file = context.Request.Files["Filedata"];
                string path = context.Server.MapPath("~/nfc/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                path += nid.Substring(0, 6) + @"/";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                path += nid.Substring(6, 2) + @"/";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                path += nid + @"/";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string ftype = Ejeck.Com.FileHelper.GetFileType(file.FileName);
                Ejeck.CMS.CS.model.CMSAlbums img = new Ejeck.CMS.CS.model.CMSAlbums();
                img.ImgID = Ejeck.keyAdmin.KeyAdmin.CreateLongKeyValue<Ejeck.CMS.CS.model.CMSAlbums>();
                img.NewsID = nid;

                int width = 0, height = 0;
                //原始路径
                img.OriginalPath = "/nfc/" + nid.Substring(0, 6) + @"/" + nid.Substring(6, 2) + @"/" + nid + @"/" + file.FileName;

                //大于500KB的图片，都要进行图片压缩，大于100K的图片生成缩略图
                if (file.ContentLength > 512000)//图片压缩
                {
                    file.SaveAs(path + nid + "2" + ftype);//先上传图片
                    //压缩图片
                    Image pic = Image.FromFile(path + nid + "2" + ftype);//strFilePath是该图片的绝对路径
                    width = pic.Width;//长度像素值
                    height = pic.Height;//高度像素值 
                    if (width > 1280)
                    {
                        height = height * 1280 / width;
                        width = 1280;
                    }

                    Ejeck.Com.ImageHelper.CreateThumbnail(path + nid + "2" + ftype, path + file.FileName, width, height, "DB", "png");
                    File.Delete(path + nid + "2" + ftype);
                }
                else
                {
                    file.SaveAs(path + file.FileName);
                }
                if (width == 0)
                {
                    Image pic = Image.FromFile(path + file.FileName);//strFilePath是该图片的绝对路径
                    width = pic.Width;//长度像素值
                    height = pic.Height;//高度像素值 
                    if (width > 1280)
                    {
                        height = height * 1280 / width;
                        width = 1280;
                    }
                }
                img.ImgFileSize = Ejeck.Com.FileHelper.GetFileSize(path + file.FileName, 0);
                img.ImgHeight = height;
                img.ImgWidth = width;
                img.IsDeleted = -1;//正文中的图片

                Ejeck.CMS.CS.biz.cmsalbums.Add(img);//保存记录

                UploadResult ur = new UploadResult();
                ur.err = "";
                ur.msg ="/nfc/" + nid.Substring(0, 6) + @"/" + nid.Substring(6, 2)+@"/"+nid+@"/"+file.FileName;

                //返回轮播图片
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(ur));
                #endregion
            }
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }

    /// <summary>
    /// xheditor的上传结果类
    /// </summary>
    public class UploadResult
    { 
        public string err { get; set; } 
        public string msg { get; set; } 
    }
}