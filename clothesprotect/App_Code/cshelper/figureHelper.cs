using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Newtonsoft.Json;




public static class figureHelper
{


    public static Result GetInfoById(string userId)
    {
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        var result = new Result<Figure>();
        //此处需优化，参数化处理
        var sqltextFomat = "select * from [clothes].[dbo].[figure] where userId={0}";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, userId));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            //result.Message = "查无此人！";
            result.IsTrue = false;
            result.Data = new Figure();
            return result;
        }
        var figures = dt.ToFigures();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = figures[0];
        result.IsTrue = true;
        return result;
    }

    public static Result AddFigure(string userId, string weight, string stature, string chestSize, string waistSize, string hiplineSize)
    {
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[figure] (userId,weight,stature,chestSize,waistSize,hiplineSize) values ('{0}','{1}','{2}','{3}','{4}','{5}') ";
        var sqlText = string.Format(sqltextFomat, userId, weight, stature, chestSize, waistSize, hiplineSize);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }


    public static Result EditFigure(int userId, string weight, string stature, string chestSize, string waistSize, string hiplineSize, int id)
    {
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        //此处需优化，参数化处理
        var sqltextFomat = "update [clothes].[dbo].[figure] set userId='{0}',weight='{1}',stature='{2}',chestSize='{3}',waistSize='{4}',hiplineSize='{5}' where id={6} ";
        var sqlText = string.Format(sqltextFomat, userId, weight, stature, chestSize, waistSize, hiplineSize, id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }

    public static Result DeleteFigureById(int id)
    {
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        var sqltextFomat = "delete from [clothes].[dbo].[figure] where id={0} ";
        //此处需优化，参数化处理
        var sqlText = string.Format(sqltextFomat, id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }




}