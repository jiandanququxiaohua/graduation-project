using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class wear : System.Web.UI.Page
{
    //type=1  get; type=2 add;type=3 edit;type=4 delete
    int[] _types = new int[] { 1, 2, 3, 4 };
    protected void Page_Load(object sender, EventArgs e)
    {
        //type=1  get; type=2 add;type=3 edit
        var type = Request.Params.Get("type") ?? "";
        var inttype = 0;
        int.TryParse(type, out inttype);
        if (!_types.Contains(inttype))
        {
            //type值不合法
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = "type只能赋值1、2、3、4" }));
            return;
        }
        //post取参
        //var cc=Request.Params.Get("name") ?? "";
        try
        {
            //查找
            if (inttype == 1)
            {
                //styleid
                var typeid = Request.Params.Get("styleid") ?? "";
                //当前用户id
                var userid = Request.Params.Get("userid") ?? "";
                //衣服名称
                var name = Request.Params.Get("name") ?? "";
                Response.Write(JsonConvert.SerializeObject(ChuanDaHelper.GetInfoByTypeOrName(typeid, name, userid)));
                return;
            }
            //编辑
            if (inttype == 2)
            {

                //类型主键id
                var id = Request.Params.Get("id") ?? "";

                var intid = Convert.ToInt32(id);

                var userId = Request.Params.Get("userId") ?? "";
                var name = Request.Params.Get("name") ?? "";
                var styleId = Request.Params.Get("styleId") ?? "";
                var clothIds = Request.Params.Get("clothIds") ?? "";
                var describe = Request.Params.Get("describe") ?? "";
                var createTime = Request.Params.Get("createTime") ?? "";
                var endTime = Request.Params.Get("endTime") ?? "";

                Response.Write(JsonConvert.SerializeObject(ChuanDaHelper.EditChuanDa(name,styleId,clothIds,describe,createTime,endTime, intid)));
                return;
            }
            //新增
            if (inttype == 3)
            {
                var userId = Request.Params.Get("userId") ?? "";
                var name = Request.Params.Get("name") ?? "";
                var styleId = Request.Params.Get("styleId") ?? "";
                var clothIds = Request.Params.Get("clothIds") ?? "";
                var describe = Request.Params.Get("describe") ?? "";
                var createTime = Request.Params.Get("createTime") ?? "";
                var endTime = Request.Params.Get("endTime") ?? "";

                Response.Write(JsonConvert.SerializeObject(ChuanDaHelper.AddChuanDa(name, styleId, clothIds, describe, createTime, endTime)));
                return;
            }
            //删除
            if (inttype == 4)
            {
                //类型主键id
                var id = Request.Params.Get("id") ?? "";
                var intid = Convert.ToInt32(id);
                Response.Write(JsonConvert.SerializeObject(ChuanDaHelper.DeleteChuanDaById(intid)));
                return;
            }
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = ex.ToString() }));
        }
    }
}