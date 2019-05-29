
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CYQ.Data.Tool;
using DBUtilityV2;
using Newtonsoft.Json;


public partial class figure : System.Web.UI.Page
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

                //当前用户id
                var userid = Request.Params.Get("userId") ?? "";

                Response.Write(JsonConvert.SerializeObject(figureHelper.GetInfoById(userid)));
                return;
            }
            //编辑
            if (inttype == 2)
            {

                //类型主键id
                var id = Request.Params.Get("id") ?? "";
                var intid = Convert.ToInt32(id);

                var userId = Request.Params.Get("userId") ?? "";
                var weight = Request.Params.Get("weight") ?? "";
                var stature = Request.Params.Get("stature") ?? "";
                var chestSize = Request.Params.Get("chestSize") ?? "";
                var waistSize = Request.Params.Get("waistSize") ?? "";
                var hiplineSize = Request.Params.Get("hiplineSize") ?? "";

                Response.Write(JsonConvert.SerializeObject(figureHelper.EditFigure(Convert.ToInt32(userId), weight, stature, chestSize, waistSize, hiplineSize, intid)));
                return;
            }
            //新增
            if (inttype == 3)
            {
                var userId = Request.Params.Get("userId") ?? "";
                var weight = Request.Params.Get("weight") ?? "";
                var stature = Request.Params.Get("stature") ?? "";
                var chestSize = Request.Params.Get("chestSize") ?? "";
                var waistSize = Request.Params.Get("waistSize") ?? "";
                var hiplineSize = Request.Params.Get("hiplineSize") ?? "";

                Response.Write(JsonConvert.SerializeObject(figureHelper.AddFigure(userId, weight, stature, chestSize, waistSize, hiplineSize)));
                return;
            }
            //删除
            if (inttype == 4)
            {
                //类型主键id
                var id = Request.Params.Get("id") ?? "";
                var intid = Convert.ToInt32(id);
                Response.Write(JsonConvert.SerializeObject(figureHelper.DeleteFigureById(intid)));
                return;
            }
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = ex.ToString() }));
        }
    }


}