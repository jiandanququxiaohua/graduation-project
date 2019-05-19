using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class aspx_collection : System.Web.UI.Page
{

    //type=1  get; type=2 add;type=3 edit;type=4 delete
    int[] _types = new int[] { 1, 2, 3, 4 };

    collection_cloth collcloth = new collection_cloth();
    protected void Page_Load(object sender, EventArgs e)
    {
        //type=1  get; type=2 add;type=3 edit
        var type = Request.QueryString.Get("type") ?? "";
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
                var userid = Request.Params.Get("userid") ?? "";

                Response.Write(JsonConvert.SerializeObject(collcloth.collection_get(Convert.ToInt32(userid))));
                return;
            }
            //编辑
            if (inttype == 2)
            {

                //类型主键id
                var id = Request.Params.Get("id") ?? "";
                var intid = Convert.ToInt32(id);
                var clothId = Request.Params.Get("clothId") ?? "";

                Response.Write(JsonConvert.SerializeObject(collcloth.collection_update(clothId, intid)));
                return;
            }
            //新增
            if (inttype == 3)
            {

                var clothId = Request.Params.Get("clothId") ?? "";
                var startTime = Request.Params.Get("startTime") ?? "";
                var endTime = Request.Params.Get("endTime") ?? "";
                Response.Write(JsonConvert.SerializeObject(collcloth.collection_insert(clothId, startTime, endTime)));
                return;
            }
            //删除
            if (inttype == 4)
            {
                //类型主键id
                var id = Request.Params.Get("id") ?? "";
                var intid = Convert.ToInt32(id);
                Response.Write(JsonConvert.SerializeObject(collcloth.collection_delete(intid)));
                return;
            }
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = ex.ToString() }));
        }
    }
}