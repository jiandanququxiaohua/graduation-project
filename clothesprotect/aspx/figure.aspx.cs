
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
    DbHelperV2 dbhelperv2 = new DbHelperV2();
    protected void Page_Load(object sender, EventArgs e)
    {
        var userId = Request.QueryString.Get("userId") ?? "";
        var type = Request.QueryString.Get("type") ?? "";
        var weight = Request.QueryString.Get("weight") ?? "";
        var stature = Request.QueryString.Get("stature") ?? "";
        var chestSize = Request.QueryString.Get("chestSize") ?? "";
        var waistSize = Request.QueryString.Get("waistSize") ?? "";
        var hiplineSize = Request.QueryString.Get("hiplineSize") ?? "";

        //post取参
        //var cc=Request.Params.Get("name") ?? "";
        try
        {
            if (type == "0") // 获取
            {

            } else if (type == "1") // 新增
            {
                Response.Write(JsonConvert.SerializeObject(addFigureClothes(userId, weight, stature, chestSize, waistSize, hiplineSize)));
                return;
            } else
            {

            }
            
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = ex.ToString() }));
        }
    }

    /// <summary>
    /// 注册
    /// </summary>
    /// <param name="loginName"></param>
    /// <param name="loginPsw"></param>
    /// <param name="alias"></param>
    /// <param name="age"></param>
    /// <returns></returns>
    private Result addFigureClothes(string userId, string weight, string stature, string chestSize, string waistSize, string hiplineSize)
    {
        var result = new Result<List<User>>();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[figure] (userId, weight, stature, chestSize, waistSize, hiplineSize) values ('{0}','{1}','{2}','{3}','{4}','{5}') ";
        var sqlText = string.Format(sqltextFomat, userId, weight, stature, chestSize, waistSize, hiplineSize);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }

}