﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;


public static class ChuanDaHelper
{


    public static Result GetInfoByTypeOrName(string styeid, string name, string userId)
    {
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        var result = new Result<List<Chuanda>>();
        var whereexp = " userId=" + userId;
        if (!string.IsNullOrEmpty(styeid))
        {
            whereexp = whereexp + " and styleId=" + styeid;
        }
        if (!string.IsNullOrEmpty(name))
        {
            whereexp = whereexp + " and name LIKE '%" + name + "%'";
        }

        //此处需优化，参数化处理
        var sqltextFomat = @"SELECT TOP 1000 cd.[id]
                                ,[styleId]
                                ,[clothIds]
                                ,cd.[describe]
                                ,[userId]
                                ,[createTime]
                                ,[endTime]
                                ,cd.[name]
	                            ,sl.sName
	                            ,sl.describe as styledescribe
                    FROM [clothes].[dbo].[chuanda] cd inner join [clothes].[dbo].[style] sl  on {0} and cd.styleId= sl.id";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, whereexp));
        
        var dts = dt.ToChuanDa();
        //result.Code = 200;
        //result.Message = "成功！";
        //result.Data = dts;
        //result.IsTrue = true;
        //return result;
        return new Result<List<Chuanda>> { Code = 200, IsTrue = true, Message = "成功", Data = dts };
    }

    public static Result AddChuanDa(string userId, string name, string styleId, string clothIds, string describe, string createTime, string endTime)
    {
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[chuanda] (userId,name,styleId,clothIds,describe,createTime,endTime) values ('{0}','{1}','{2}','{3}','{4}','{5}', '{6}') ";
        var sqlText = string.Format(sqltextFomat, userId, name, styleId, clothIds, describe, createTime, endTime);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }

    public static Result EditChuanDa(string id, string userId, string name, string styleId, string clothIds, string describe, string createTime, string endTime)
    {
        var intid = Convert.ToInt32(id);
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        //此处需优化，参数化处理
        var sqltextFomat = "update [clothes].[dbo].[chuanda] set name='{0}',styleId='{1}',clothIds='{2}',describe='{3}',createTime='{4}',endTime='{5}', userId='{6}' where id={7}  ";
        var sqlText = string.Format(sqltextFomat, name, styleId, clothIds, describe, createTime, endTime, userId, intid);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }


    public static Result DeleteChuanDaById(int id)
    {
        var result = new Result();
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        //此处需优化，参数化处理
        var sqltextFomat = "delete from [clothes].[dbo].[chuanda] where id={0} ";
        var sqlText = string.Format(sqltextFomat, id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }
}