using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class share : System.Web.UI.Page
{
    //type=1  get; type=2 add;type=3 edit;type=4 delete
    int[] _types = new int[] { 1, 2, 3, 4 };

    share_cloth collcloth = new share_cloth();
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

                //当前用户id
                var userid = Request.Params.Get("userId") ?? "";
                if (string.IsNullOrWhiteSpace(userid))
                {
                    Response.Write(JsonConvert.SerializeObject(collcloth.share_all_get()));
                    return;
                }
                Response.Write(JsonConvert.SerializeObject(collcloth.share_current_get(Convert.ToInt32(userid))));
                return;
            }
            //编辑
            if (inttype == 3)
            {

                //类型主键id
                var id = Request.Params.Get("id") ?? "";
                var intid = Convert.ToInt32(id);
                var clothId = Request.Params.Get("clothId") ?? "";
                var describe = Request.Params.Get("describe") ?? "";
                Response.Write(JsonConvert.SerializeObject(collcloth.share_update(clothId, describe, intid)));
                return;
            }
            //新增
            if (inttype == 2)
            {

                var clothId = Request.Params.Get("clothId") ?? "";
                var describe = Request.Params.Get("describe") ?? "";
                var date = Request.Params.Get("date") ?? "";
                var belong = Request.Params.Get("belong") ?? "";
                Response.Write(JsonConvert.SerializeObject(collcloth.share_insert(clothId, describe, belong, date)));
                return;
            }
            //删除
            if (inttype == 4)
            {
                //类型主键id
                var id = Request.Params.Get("id") ?? "";
                var intid = Convert.ToInt32(id);
                Response.Write(JsonConvert.SerializeObject(collcloth.share_delete(intid)));
                return;
            }
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = ex.ToString() }));
        }
    }
}